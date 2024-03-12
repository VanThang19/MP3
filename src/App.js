import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Home, Public, Login, Personal, Album } from './containers/public/Index'
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Path from './ultis/Path'
import * as actions from './store/actions'
import { UseDispatch } from 'react-redux';

// useSelector : lấy dữ liệu từ redux
// useDispatch : đẩy sự kiện action đến redux
// Redux : Là một thư viện JavaScript giúp quản lý trạng thái của ứng dụng theo một cách dự đoán và dễ gỡ lỗi.
/*
 ReactRoute :   <Route path='/*' element={<Public />} > || React Router là một thư viện phổ biến để xây dựng các ứng dụng trang đơn (SPA) 
1. path='/*' : Đường link của trang 
2. element={<Public />} : componemt - trang tương ứng
  */

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHomePage())
  }, [])
  return (
    <>

      <div className='' >
        <Routes>
          <Route path={Path.PUBLIC} element={<Public />} >
            <Route path={Path.HOME} element={<Home />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.MY_MUSIC} element={<Personal />} />
            <Route path={Path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={Path.PLAYLIST__TITLE__PID} element={<Album />} />



            <Route path={Path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
