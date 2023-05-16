import React, { useEffect, useState } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import axiosInstance from '@/lib/axios-instance'

const useAxios = () => {
  const showLoader = (
    open: boolean
  ) => {

    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }
  const axiosPost = async (url:string, params : object) => {
  return await axiosInstance.post(url,params)
    .then((response) => {
      console.log('GET API response-->', response)
      return response
    })
    .catch((e) => e.message)
}
  const axiosGet = async (url:string, params : object) => {
  return await axiosInstance.get(url,{params})
    .then((response) => {
      console.log('GET API response-->', response)
      return response
    })
    .catch((e) => e.message)
}
const axiosPut = async (url:string, params : object) => {
  return await axiosInstance.post(url,params)
    .then((response) => {
      console.log('PUT API response-->', response)
      return response
    })
    .catch((e) => e.message)
}
const axiosDelete = async (url:string, params : object) => {
  return await axiosInstance.post(url,params)
    .then((response) => {
      console.log('DELETE API response-->', response)
      return response
    })
    .catch((e) => e.message)
}

  return {
    showLoader,axiosPost,axiosGet
  }
}

export default useAxios
