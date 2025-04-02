"use client"

import { useEffect } from "react"
import { Message, useChat } from "@ai-sdk/react"
import { toast } from "sonner"

import { CHAT_ID } from "@/lib/constants"
import { Model } from "@/lib/types/models"

import { SenderPanel } from "@/components/sender-panel"
import { Messages } from "@/components/messages"
import { cn } from "@/lib/utils"

export function Chat({
  id,
  savedMessages = [],
  query,
  models,
}: {
  id: string
  savedMessages?: Message[]
  query?: string
  models?: Model[]
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    stop,
    append,
    setData,
  } = useChat({
    initialMessages: savedMessages,
    id: CHAT_ID,
    body: {
      id,
    },
    onFinish: () => {
      window.history.replaceState({}, "", `/search/${id}`)
    },
    onError: (error) => {
      toast.error(`Error in chat: ${error.message}`)
    },
    sendExtraMessageFields: false, // Disable extra message fields
  })

  useEffect(() => {
    setMessages(savedMessages)
  }, [id])

  const onQuerySelect = (query: string) => {
    append({
      role: "user",
      content: query,
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData(undefined) // reset data to clear tool call
    handleSubmit(e)
  }



  return (
    <div className={cn("flex flex-col min-h-0 w-full grow")}>
      {/*<Messages />*/}
      <SenderPanel
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        messages={messages}
        stop={stop}
        models={models}
      />
    </div>
  )
}
