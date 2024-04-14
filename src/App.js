import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Home, Public, Login, Personal, Album, WeekRank, ZingChart, Follow, Search, Search_All, Search_Songs, Singer, SearchPlaylist } from './containers/public/Index'
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Path from './ultis/Path'
import * as actions from './store/actions'
import { apiGetChartHome } from './apis';

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
  const [weekChart, setWeekChart] = useState(null)

  //lấy độ rộng khi khởi chạy
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)

  //set width khi trở lại kích thước
  const setWidth = (e) => {
    setCurrentWidth(e.target.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', setWidth)

    return () => {
      window.removeEventListener('resize', setWidth)
    }
  }, [])

  //tryền kích thước cho các pages
  useEffect(() => {
    dispatch(actions.setCurrentWidth(currentWidth))
  }, [currentWidth])


  useEffect(() => {
    dispatch(actions.getHomePage())
    const GetChartData = async () => {
      const res = await apiGetChartHome()
      if (res.data.err === 0) setWeekChart(res.data.data.weekChart)
    }
    GetChartData()
  }, [])
  return (
    <>

      <div  >
        <Routes>
          <Route path={Path.PUBLIC} element={<Public />} >
            <Route path={Path.HOME} element={<Home />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.MY_MUSIC} element={<Personal />} />
            <Route path={Path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={Path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={Path.WEEKRANK__TITLE__PID} element={<WeekRank weekChart={weekChart && Object.values(weekChart)} />} />
            <Route path={Path.ZING_CHART} element={<ZingChart />} />
            <Route path={Path.FOLLOW} element={<Follow />} />
            <Route path={Path.HOME__SINGER} element={<Singer />} />
            <Route path={Path.HOM__ARTIST__SINGER} element={<Singer />} />
            <Route path={Path.SEARCH} element={<Search />} >
              <Route path={Path.ALL} element={<Search_All />} />
              <Route path={Path.SONG} element={<Search_Songs />} />
              <Route path={Path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
            </Route>
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
        pauseOnFocusLossy
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
