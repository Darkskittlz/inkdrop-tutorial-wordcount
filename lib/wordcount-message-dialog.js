'use babel'

import React, { useState, useEffect, useCallback } from 'react'
import { logger, useModal } from 'inkdrop'
const { Dialog } = inkdrop.components.classes
import { useSelector } from 'react-redux'


const selectEditingNoteBody = ({ editingNote }) =>
  editingNote ? editingNote.body : ''

const WordcountMessageDialog = props => {
  const [count, setCount] = useState(0)
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes
  const noteBody = useSelector(selectEditingNoteBody)

  const countWords = useCallback(() => {
    return noteBody.split(/\s+/).length
  }, [noteBody])


  const toggle = useCallback(() => {
    setCount(countWords())
    modal.show()
  }, [countWords])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'wordcount:toggle': toggle
    })
    return () => sub.dispose()
  }, [toggle])

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
    <Dialog.Title>Wordcount</Dialog.Title>
    <Dialog.Content>There are {count} words.</Dialog.Content>
    <Dialog.Actions>
      <button className="ui button" onClick={modal.close}>
        Close
      </button>
    </Dialog.Actions>
  </Dialog>
  )
}

export default WordcountMessageDialog