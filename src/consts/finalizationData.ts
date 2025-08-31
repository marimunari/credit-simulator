// internal animations
import SuccessAnimation from '@/src/assets/animations/success.json';
import ErrorAnimation from '@/src/assets/animations/error.json';

// types
export type FinalizationType = 'success' | 'error';

export type FinalizationMessages = {
  /* Title displayed in the finalization screen */
  title: string;

  /* Description displayed below the title, supports multiline text */
  description: string;
};

export type LottieAnimationData = object;

export const animationsMap: Record<FinalizationType, LottieAnimationData> = {
  success: SuccessAnimation,
  error: ErrorAnimation
};

export const messagesMap: Record<FinalizationType, FinalizationMessages> = {
  success: {
    title: 'Simulação realizada com sucesso!',
    description: `Em breve, você receberá um e-mail com todos os detalhes.
Nossa equipe também poderá entrar em contato para tirar dúvidas e ajudar você no que for necessário.`
  },
  error: {
    title: 'Ops! Não conseguimos processar sua simulação.',
    description: `Algo deu errado durante o processo.
Por favor, tente novamente mais tarde.
Se o problema persistir, entre em contato com o nosso suporte para que possamos ajudar.`
  }
};
