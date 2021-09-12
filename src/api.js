export const API_URL = 'https://dogsapi.origamid.dev/json'; //coloca a url geral da api na variavel pra ser usada facilmente depois

export function TOKEN_POST(body) {
  //funcao pra validacao de usuario por token, parametro body faz referencia a qual infos vao no body (no caso user e senha), pra saber se o token de tal usuario existe no server
  return {
    url: API_URL + '/jwt-auth/v1/token', //url da api onde o token de tal user sera buscado, pra ser feita a validacao se tal token existe no server

    options: {
      //opcoes da requisicao
      method: 'POST', //tipo de requisicao
      headers: {
        //especificacoes da requisicao
        'Content-Type': 'application/json', //declaracao do tipo de conteudo a ser postado
      },
      body: JSON.stringify(body), //tipo de dados do body sera enviado como json string (user e password)
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  //funcao pra validar o usuario atraves do token passado no parametro
  return {
    url: API_URL + '/jwt-auth/v1/token/validate',

    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token, //envia o token do user guardado no localstorage pra autorizar acao
      },
    },
  };
}

export function USER_GET(token) {
  //funcao pra pegar usuario com o token igual o passado no parametro
  return {
    url: API_URL + '/api/user',

    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_POST(body) {
  //funcao pra criar um user no server, enviando os dados passados no body da requisicao (user, email, senha)
  return {
    url: API_URL + '/api/user',

    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function PHOTO_POST(formData, token) {
  // postage de foto, precisa do formdata e do token
  return {
    url: API_URL + '/api/photo',

    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData, //conteudo vai ser o formdata
    },
  };
}

export function PHOTOS_GET({ page, total, user }) {
  //pegar fotos
  // pega a pagina, total e os usuarios q postaro foto
  return {
    url: `${API_URL}/api/photo/?_page=${page}&_total=${total}&_user=${user}`, //query string / passar urls q dependem de id's

    options: {
      method: 'GET',
      cache: 'no-store', //pra isso nao ficar em cache. pq se ficar no cache quando alguem posta foto nova nao vai atualizar
    },
  };
}

export function PHOTO_GET(id) {
  //pega so uma foto com um id especifico
  return {
    url: `${API_URL}/api/photo/${id}`, //url com id da foto clicada
    options: {
      method: 'GET',
      cache: 'no-store', //pra isso nao ficar em cache. pq se ficar no cache quando alguem posta foto nova nao vai atualizar
    },
  };
}

export function COMMENT_POST(id, body) {
  //pega o id da foto e comentario e o corpo

  return {
    url: `${API_URL}/api/comment/${id}`, //url da api pra posta comentario recebendo id da foto

    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    },
  };
}

export function PHOTO_DELETE(id) {
  //funcao pra apagar foto com id igual ao passado no parametro

  return {
    url: `${API_URL}/api/photo/${id}`, //url da api referente ao id de foto passado no parametro

    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'), //envia o token do user guardado no localstorage pra autorizar acao
      },
    },
  };
}

export function PASSWORD_LOST(body) {
  return {
    url: API_URL + '/api/password/lost',

    options: {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body) {
  return {
    url: API_URL + '/api/password/reset',

    options: {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
