import axios from "axios";
import {
  getAuth,
  signInWithCustomToken,
  signOut as firebaseSignOut,
} from "firebase/auth";
const apiUrl = `https://us-central1-nerg-one.cloudfunctions.net/api`;

type signInType = { email: string; password: string };

export async function signIn({ email, password }: signInType) {
  const auth = getAuth();
  const url = `${apiUrl}/login`;
  const res = await axios.post(url, { email, password });
  console.log(res);
  const token = res.data.token;
  await signInWithCustomToken(auth, token);
  return res.data;
}

export async function signUp(obj: {
  email: string;
  password: string;
  secureNote: string;
}) {
  const auth = getAuth();

  console.log("obj " + obj.email);
  const url = `${apiUrl}/register`;

  const res = await axios.post(url, obj);
  console.log(res);
  const token = res.data.token;
  await signInWithCustomToken(auth, token);
  return res.data;
}

type validateUserType = {
  userIdToken: string;
};

// validateUser
export async function validateUser({ userIdToken }: validateUserType) {
  const url = `${apiUrl}/user/validate/`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  return res.data;
}

export async function revokeToken(uid: string) {
  const url = `${apiUrl}/user/revoke/${uid}`;
  const res = await axios.post(url, {
    uid: uid,
  });
  return res.data;
}

type getUserDataType = { userIdToken: string; userId: string };

export async function getUserData({ userIdToken, userId }: getUserDataType) {
  const url = `${apiUrl}/users/${userId}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  return res.data;
}

export async function getPlayer() {
  const url = `${apiUrl}/player`;
  const res = await axios.get(url, {});
  return res.data;
}

export async function signout(userId: string) {
  console.log("userId", userId);

  const url = `${apiUrl}/signout/${userId}`;
  const res = await axios.post(url);
  return res.data;
}
export async function addPlayer(
  sex: string,
  age: number,
  weight: number,
  height: number,
  name: string,
  sport: string,
  position: string
) {
  const url = `${apiUrl}/player`;
  let obj = {
    sex,
    age,
    weight,
    height,
    name,
    sport,
    position,
  };
  let res;

  try {
    res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
}

export async function addWaistAndHip(waist: number, hip: number) {
  const url = `${apiUrl}/player/wh`;
  let obj = { waist, hip };
  let res;

  try {
    res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
}

export async function getVo2(pulse: number) {
  const url = `${apiUrl}/player/vo2`;
  let obj = { pulse };
  let res;

  try {
    res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
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
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
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
    console.error(error.data); // NOTE - use "error.response.data` (not "error")
  }
}
