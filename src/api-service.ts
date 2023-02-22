import axios from "axios";
import * as Types from "./@types";
const apiUrl = `https://us-central1-nerg-one.cloudfunctions.net/api`;

type signInType = { email: string; password: string };

export async function signIn({ email, password }: signInType) {
  const url = `${apiUrl}/login`;
  const res = await axios.post(url, { email, password });

  console.log(res);
  localStorage.setItem(
    "@user",
    JSON.stringify({
      uid: res.data.uid.user.uid,
      accessToken: res.data.uid.user.stsTokenManager.accessToken,
      expirationTime: res.data.uid.user.stsTokenManager.expirationTime,
      refreshToken: res.data.uid.user.stsTokenManager.refreshToken,
      expired: res.data.uid._tokenResponse.expiresIn,
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

  console.log(res);
  localStorage.setItem(
    "@user",
    JSON.stringify({
      uid: res.data.uid.user.uid,
      accessToken: res.data.uid.user.stsTokenManager.accessToken,
      expirationTime: res.data.uid.user.stsTokenManager.expirationTime,
      refreshToken: res.data.uid.user.stsTokenManager.refreshToken,
      expired: res.data.uid._tokenResponse.expiresIn,
    })
  );
  return res.data;
}

type validateUserType = {
  userIdToken: string;
};

export async function validateToken({ userIdToken }: validateUserType) {
  const url = `${apiUrl}/user/validateToken/`;
  console.log("bearer", {
    headers: {
      authorization: `Bearer ${userIdToken}`,
    },
  });
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
  if (obj.accessToken) {
    try {
      res = await axios.post(url, {
        ...obj,
        idToken: obj.accessToken,
      });
      console.log({
        ...obj,
        idToken: obj.accessToken,
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

export async function getPlayer(accessToken: Types.tokenType) {
  const url = `${apiUrl}/player/${accessToken.accessToken}`;
  const options = {
    method: "GET",
    url: url,
  };
  let res;

  if (accessToken) {
    await axios
      .request(options)
      .then(function (response: any) {
        console.log("response.data player", response.data.player);
        res = response.data.player;
      })
      .catch(function (error: any) {
        // console.error(error);
        res = error;
      });
    return res;
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
    idToken: accessToken,
  };
  console.log(obj);
  let res;

  try {
    res = await axios.post(url, obj);
    console.log("res", res);
    return res.data;
  } catch (error: any) {
    console.error(error.data);
    return error.data;
  }
}

// signout
export async function revokeToken(uid: string) {
  localStorage.removeItem("@user");
  const url = `${apiUrl}/user/revoke/${uid}`;
  const res = await axios.post(url, {
    uid: uid,
  });

  return res.data;
}

export async function addVo2(pulse: number, accessToken: string) {
  const url = `${apiUrl}/player/vo2`;
  let obj = { pulse, idToken: accessToken };
  let res;

  try {
    res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data);
  }
}

export async function getMET(
  minutes: number,
  seconds: number,
  accessToken: string
) {
  const url = `${apiUrl}/player/met`;
  let obj = { minutes, seconds, idToken: accessToken };
  console.log(obj);

  try {
    let res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data);
    return error.data;
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
