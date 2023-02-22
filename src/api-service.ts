import axios from "axios";
// import {
//   getAuth,
//   signInWithCustomToken,
//   signOut as firebaseSignOut,
// } from "firebase/auth";
const apiUrl = `https://us-central1-nerg-one.cloudfunctions.net/api`;

type signInType = { email: string; password: string };

export async function signIn({ email, password }: signInType) {
  const url = `${apiUrl}/login`;
  const res = await axios.post(url, { email, password });

  localStorage.setItem(
    "@user",
    JSON.stringify({
      token: res.data.token,
      uid: res.data.uid.user.uid,
      stsTokenManager: res.data.uid.user.stsTokenManager,
      accessToken: res.data.uid.user.stsTokenManager.accessToken,
    })
  );
  return res.data;
}

export async function signUp(obj: {
  email: string;
  password: string;
  secureNote: string;
}) {
  const url = `${apiUrl}/register`;
  const res = await axios.post(url, obj);

  localStorage.setItem(
    "@user",
    JSON.stringify({
      token: res.data.token,
      uid: res.data.uid.user.uid,
      stsTokenManager: res.data.uid.user.stsTokenManager,
      accessToken: res.data.uid.user.stsTokenManager.accessToken,
    })
  );
  return res.data;
}

type validateUserType = {
  userIdToken: string;
};

export async function validateToken({ userIdToken }: validateUserType) {
  //   console.log(userIdToken);
  const url = `${apiUrl}/user/validateToken/`;
  const res = await axios.get(url, {
    headers: {
      authorization: `Bearer ${userIdToken}`,
    },
  });
  console.log("res.data", res.data);
  return res.data;
}

export async function addPlayer(obj: {
  sex: string;
  age: number;
  weight: number;
  height: number;
  name: string;
  sport: string;
  position: string;
  accessToken: string;
}) {
  const url = `${apiUrl}/player`;
  let res;
  //   console.log("obj.accessToken", obj.accessToken);
  if (obj.accessToken) {
    try {
      res = await axios.post(url, {
        ...obj,
        accessToken: obj.accessToken,
      });
      console.log(res);
      return res.data;
    } catch (error: any) {
      console.error(error.data);
    }
  } else {
    return "no-access";
  }
}

export async function addWaistAndHip(
  waist: number,
  hip: number,
  accessToken: string
) {
  const url = `${apiUrl}/player/wh`;
  let obj = {
    waist,
    hip,
    headers: { authorization: `Bearer ${accessToken}` },
  };
  console.log(obj);
  let res;

  try {
    res = await axios.post(url, obj);
    console.log("res", res);
    return res.data;
  } catch (error: any) {
    console.error(error.data);
  }
}

// export async function test({ userIdToken }: validateUserType) {
//   const url = `${apiUrl}/test/`;
//   const res = await axios.get(url, {
//     headers: {
//       authorization: `Bearer ${userIdToken}`,
//     },
//   });
//   console.log("res.data", res.data);
//   return res.data;
// }

// signout
export async function revokeToken(uid: string) {
  console.log("uid,", uid);
  const url = `${apiUrl}/user/revoke/${uid}`;
  const res = await axios.post(url, {
    uid: uid,
  });
  localStorage.removeItem("@user");
  return res.data;
}

export async function getPlayer() {
  const url = `${apiUrl}/player`;
  const res = await axios.get(url, {});
  return res.data;
}

export async function getVo2(pulse: number) {
  const url = `${apiUrl}/player/vo2`;
  let obj = { pulse };
  let res;

  try {
    res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data);
  }
}

export async function getMET(minutes: number, seconds: number) {
  const url = `${apiUrl}/player/met`;
  let obj = { minutes, seconds };
  let res;

  try {
    res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data);
  }
}

export async function getKeyMeasurements(
  neckCircumference: number,
  wingSpan: number,
  handSize: number,
  hipsCircumference: number,
  gluteCircumference: number,
  waistCircumference: number
) {
  const url = `${apiUrl}/player/key`;
  let obj = {
    neckCircumference,
    wingSpan,
    handSize,
    hipsCircumference,
    gluteCircumference,
    waistCircumference,
  };
  let res;

  try {
    res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data);
  }
}
