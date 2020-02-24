import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

admin.initializeApp(functions.config().firebase);

// tslint:disable-next-line: no-implicit-dependencies
const cors = require('cors')({ origin: true });
const moment = require('moment');
const firestoreInstance = admin.firestore();

exports.getDate = functions.https.onRequest((req, res) => {
  if (req.method !== 'GET') {
    return res.status(403).send('Forbidden!');
  }
  return cors(req, res, () => {
    let format = req.query.format;
    if (!format) {
      format = req.body.format;
    }
    const formattedDate = moment().format(format);
    res.status(200).send(formattedDate);
  });
});

exports.createUser = functions.auth.user().onCreate((user: UserRecord, context) => {
  return firestoreInstance
    .collection('user')
    .doc(`${user.uid}`)
    .set({
      id: user.uid,
      uid: user.uid,
      email: user.email,
      address: '**NotDefined**',
      cellphone: '**NotDefined**',
      displayName: '**NotDefined**',
      phoneNumber: '**NotDefined**',
      photoURL: '**NotDefined**',
    });
});

exports.deleteUser = functions.auth.user().onDelete((user: UserRecord) => {
  return firestoreInstance
    .collection('user')
    .doc(`${user.uid}`)
    .delete();
});
