import { v4 as uuidv4 } from 'uuid';

export const generateUniqueRoomId = () => {
  return uuidv4();
};

export const getSessionURL = () => {
    const roomId = generateUniqueRoomId();
    const newUrl = `${window.location.href}?room=${roomId}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    return newUrl;
};

export const getRoomIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('room');
};