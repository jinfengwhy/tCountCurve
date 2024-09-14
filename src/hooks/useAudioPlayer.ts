import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';

const useAudioPlayer = (initialSrc: string) => {
  const [audioContext, setAudioContext] = useState<any>(null);

  useEffect(() => {
    // 创建音频上下文实例
    const ac = Taro.createInnerAudioContext({ useWebAudioImplement: true });
    setAudioContext(ac);

    return () => {
      // 组件卸载时释放音频上下文
      ac.destroy();
    };
  }, []);

  const playAudio = () => {
    if (audioContext) {
      audioContext.src = initialSrc;
      audioContext.play();
    }
  };

  const pauseAudio = () => {
    if (audioContext) {
      audioContext.pause();
    }
  };

  return {
    playAudio,
    pauseAudio,
  };
};

export default useAudioPlayer;
