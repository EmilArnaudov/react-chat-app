import { useEffect, useRef } from 'react'

import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

import styles from './EmojiPicker.module.css'

export default function EmojiPicker() {
  const ref = useRef()

  useEffect(() => {
    new Picker({data, ref })
  })

  function show(e) {
      console.log(e.target);
  }

  return (
        <div className={styles.emoji}>
            <div ref={ref}/>
        </div>
    
  )
}