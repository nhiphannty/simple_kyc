## Please follow this flow

### User:

1. Log in with username/password: michaelw/michaelwpass
2. Fill in profile information
3. Go to KYC
4. Fill in KYC information

### Officer:

1. Log in with username/password: emilys/emilyspass
2. Sort all clients list by state: Pending/Approved/Rejected
3. View details
4. Process result

Note: after choosing approve/reject, to reset result, change the local storage with key `submissionState` to `1`; or uncomment line 52 in file `src\pages\officer\ClientDetails.tsx`