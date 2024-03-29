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
      accessToken: res.data.customToken,
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
      accessToken: res.data.customToken,
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
      console.log("Inside addPlayer ", {
        ...obj,
        idToken: obj.accessToken,
      });

      res = await axios.post(url, {
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

export async function updatePlayer(obj: {
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

  console.log({
    ...obj,
    idToken: obj.accessToken,
  });
  if (obj.accessToken) {
    try {
      res = await axios.put(url, {
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
  const url = `${apiUrl}/player`;
  let res;

  if (accessToken) {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
    });

    return res.data.player;
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
export async function revokeToken(idToken: string) {
  localStorage.removeItem("@user");
  const url = `${apiUrl}/user/revoke`;
  const res = await axios.post(url, {
    idToken,
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

//ethnicity, complexion, bloodType
export async function getGenetics(
  ethnicity: string,
  complexion: string,
  bloodType: string,
  accessToken: string
) {
  const url = `${apiUrl}/player/genetic`;
  let obj = { ethnicity, complexion, bloodType, idToken: accessToken };

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
  waistCircumference: number,
  accessToken: string
) {
  const url = `${apiUrl}/player/key`;
  let obj = {
    neckCircumference,
    wingSpan,
    handSize,
    hipsCircumference,
    gluteCircumference,
    waistCircumference,
    idToken: accessToken,
  };
  let res;

  try {
    res = await axios.post(url, obj);
    return res.data;
  } catch (error: any) {
    console.error(error.data);
  }
}
