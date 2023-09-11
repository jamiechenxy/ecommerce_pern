const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

export const verifyAuthentication = async () => {
  try {
    const res = await fetch(`${api_endpoint}/auth/status`, {
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });

    const response = await res.json();

    return response;

  } catch (error) {
    return { error };
  }
};

export const getUserInfoById = async (userId) => {
  try {
    const res = await fetch(`${api_endpoint}/users/${userId}`, {
      headers: { 
        'Content-type': 'application/json', 
      },
      credentials: "include",
    });

    const response = await res.json();

    return response[0];

  } catch (error) {
    return { error };
  }
}

export const createUser = async (data) => {
    try {
        const res = await fetch(`${api_endpoint}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json',
              'Auth-Method': 'local',
            },
            credentials: 'include',
        });

        const response = await res.json();
        
        return response;
        
    } catch (error) {
        return { error };
    }
};

export const createGoogleUser = async(utObj) => {
  try {
    const res = await fetch(`${api_endpoint}/auth/google`, {
      method: "POST",
      body: JSON.stringify(utObj),
      headers: {
        'Content-type': 'application/json',
        // 'Auth-Method': 'google',
      },
      credentials: 'include',
    });

    const response = await res.json();

    return response;

  } catch (error) {
    return{ error };
  }
};

export const loginLocalUser = async(userObj) => {
  try {
    const res = await fetch(`${api_endpoint}/auth/login`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        'Content-type': 'application/json',
        // 'Auth-Method': 'local',
      },
      credentials: 'include',
    });

    const response = await res.json();

    return response;

  } catch (error) {
    return { error };
  }
};

export const signOut = async () => {
  try {
    const response = await fetch(`${api_endpoint}/users/logout`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    })

    return response;

  } catch (error) {
    return { error };
  }
}



