// pages/api/auth/callback/google.js

// import { NextApiRequest, NextApiResponse } from 'next';
// import passport from 'passport';

// export default async function handler(req, res) {
//   passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Perform any additional actions after successful authentication (e.g., user creation, session handling)

//     // Redirect or respond as needed
//     res.redirect('/dashboard');
//   })(req, res);
//}
