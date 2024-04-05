import React from 'react';
import { useSelector } from 'react-redux'
import { Sliders, Section, NewRelease, ChartMusic } from '../../components';
import { Link } from 'react-router-dom';


const Home = () => {

    const { chill, RemixMusic, MoodMusic, Top100, Album_Hot, weekChart } = useSelector(state => state.app)
    return (
        <div className='overflow-y-auto'>
            <div className='w-full h-[70px]'></div>
            <Sliders />
            <NewRelease />
            <Section data={chill} />
            <Section data={RemixMusic} />
            <Section data={MoodMusic} />
            <ChartMusic />
            <div className='flex items-center px-[43px] w-full mt-12' >
                {weekChart?.map(item => (
                    <Link to={item?.link?.split('.')[0]} key={item.link} className='flex-1 px-4' >
                        <img src={item.cover} alt="cover" className='w-full object-cover rounded-md' />
                    </Link>
                ))}
            </div>
            <Section data={Top100} />
            <Section data={Album_Hot} />

            <div className='w-full h-[200px]' ></div>
        </div>
    );
};

export default Home;