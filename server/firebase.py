import firebase_admin
from firebase_admin import credentials, firestore

# Use a service account
cred = credentials.Certificate('firebase-admin-sdk.json')
firebase_admin.initialize_app(cred)

db = firestore.client()