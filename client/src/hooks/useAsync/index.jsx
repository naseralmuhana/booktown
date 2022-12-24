import React, { useEffect, useCallback, useReducer } from "react"
import { errorHandler } from "../../utils"

const asyncReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        isLoading: true,
        isData: false,
        data: null,
        isError: false,
        error: null,
      }

    case "SUCCESS":
      return {
        isLoading: false,
        isData:
          !!action.responseData.length ||
          !!Object.keys(action.responseData).length,
        data: action.responseData,
        isError: false,
        error: null,
      }

    case "ERROR":
      return {
        isLoading: false,
        isData: false,
        data: null,
        isError: !!action.errorMessage,
        error: action.errorMessage,
      }

    default:
      return state
  }
}

const useAsync = ({ asyncFunction, immediate = false }) => {
  let click = !!immediate
  const [asyncState, dispatch] = useReducer(asyncReducer, {
    isLoading: !!immediate,
    isError: false,
    isData: false,
    data: null,
    error: null,
  })

  const execute = useCallback(
    async ({ asyncData }) => {
      if (!click) dispatch({ type: "SEND" })
      try {
        const responseData = await asyncFunction(asyncData)
        dispatch({ type: "SUCCESS", responseData })
      } catch (error) {
        const errorMessage = errorHandler(error)
        dispatch({ type: "ERROR", errorMessage })
      }
    },
    [asyncFunction]
  )

  useEffect(() => {
    if (immediate) {
      execute()
      click = !click
    }
  }, [execute, immediate, click])

  return { execute, ...asyncState }
}

export default useAsync
