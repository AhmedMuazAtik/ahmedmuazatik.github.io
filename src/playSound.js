export const playSound = (path, volume = 0.5) => {
  const audio = new Audio(path);
  audio.volume = volume;
  audio.play().catch(() => {
    // Tarayıcı izin vermezse sessiz geç
  });
};