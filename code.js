import * as OTPAuth from "otpauth";

let totp = new OTPAuth.TOTP({
    issuer: "Microsoft",
    secret: "c6cpxv2ptyk7fyt7",
  });


  let otp = totp.generate();

  console.log(otp);
