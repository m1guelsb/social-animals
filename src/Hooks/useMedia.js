//HOOK pra observar mudança de tamanho de tela(media) e disparar eventos de acordo com o valor parametro

import React from 'react';

const useMedia = (media) => {
  //funcao recebe (media)=(ex:max-width) como parametro de mudança de estado

  const [match, setMatch] = React.useState(null); //criação do alterador de estado que começa como nulo (sem estado)

  React.useEffect(() => {
    //efeito colateral para quando a dependencia }, [media] tiver mudança
    function changeMatch() {
      //funcao pra mudar o estado do match(setMatch) (que muda algo apartir de um valor de tamanho da tela definido em (media))
      const { matches } = window.matchMedia(media); //funcao nativa do 'window' que recebe valor de (media) passando pra dentro de 'matches'(um componente da funcao)
      setMatch(matches); //o estado(useState) de [match] eh definido por 'matches' que contem o valor do parametro da funcao
    }
    changeMatch(); //sempre q useEffect eh ativado, changeMatch eh ativado
    window.addEventListener('resize', changeMatch); //vai adicionar um evento que ativa a função sempre q ouver um resize na janela, ativando a funcao e a funcao observa quando chega o valor do parametro (media) pra q seja ativada
    return () => {
      window.removeEventListener('resize', changeMatch); //remove o event listener quando a janela n estiver sendo resizada
    };
  }, [media]);

  return match;
};

export default useMedia;
