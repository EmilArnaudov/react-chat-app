import { useEffect, useRef, useState } from 'react'
import Picker from 'emoji-picker-react';

import styles from './EmojiPicker.module.css'

export default function EmojiPicker({
  addEmoji
}) {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    addEmoji(emojiObject.emoji);
  };

  return (
    <div className={styles.emoji}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
}