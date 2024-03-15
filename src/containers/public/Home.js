import React from 'react';
import { useSelector } from 'react-redux'
import { Slider, Section } from '../../components';


const Home = () => {

    const { chill, RemixMusic, MoodMusic, Top100, Album_Hot } = useSelector(state => state.app)

    return (
        <div className='overflow-y-auto'>
            <Slider />
            <Section data={chill} />
            <Section data={RemixMusic} />
            <Section data={MoodMusic} />
            <Section data={Top100} />
            <Section data={Album_Hot} />

            <div className='w-full h-[500px]' ></div>
        </div>
    );
};

export default Home;