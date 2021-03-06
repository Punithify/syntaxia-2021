
# Syntaxia 2021

The CYBERNETICS ASSOCIATION of Department of Computer Science, St. Joseph's College Autonomous organizes an annual inter-collegiate cultural and technological extravaganza titled as SYNTAXIA 2021. It is a colossal of different tech based events compiled together to bring you the festival of computers right at your fingertips this year as it's happening online!


![Logo](https://github.com/Punithify/syntaxia-2021/blob/main/public/assets/images/syntaxia-logo.png?raw=true)

# Credits
Project frontend design credits to [josephvempala](https://github.com/josephvempala)
    
## Features

- Registration
- Payments using razorpay


  
## Screenshots

![App Screenshot](https://syntaxia-2021.s3.us-east-2.amazonaws.com/Screenshot+2021-06-06+at+12-33-01+Syntaxia+2021.png)

![App Screenshot](https://syntaxia-2021.s3.us-east-2.amazonaws.com/Screenshot+2021-06-06+at+12-33-45+Syntaxia+2021+Register.png)
  
## Tech Stack

**Client:** Next js,Reactstrap


## Getting Started

1. Clone the repo `git clone <url>`

2. Rename the `.env.local.example` to `.env.local`.

3. Create an account on [FAUNADB](https://dashboard.fauna.com/accounts/register) and paste the `FAUNA_SECRET` in the .env.local file.

4. Create an account on [Razorpay](https://razorpay.com/docs/payment-gateway/dashboard-guide/sign-up/) which is the payment gateway used for accepting payments.Paste the `NEXT_PUBLIC_RAZORPAY_KEY` , `NEXT_PUBLIC_RAZORPAY_SECRET` which can be generated from the razorpay dashboard under the settings option.

5. The site uses reCAPTCHA,so create an [account](https://www.google.com/recaptcha/about/) and paste in the `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` , `RECAPTCHA_SECRET_KEY` in the .env.local file.

6. The project also uses razorpay webhooks,which can be created from the razorpay dashboard(under settings webhooks).The webhook should point to the url `https:<your-site-url>/api/orders`.During development use a tool called [ngrok](https://ngrok.com/) to generate public urls.

7. To run the development server,

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


  
