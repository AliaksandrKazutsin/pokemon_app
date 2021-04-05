import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, hideLoader } from '../../../redux/actions';
import { getLoader } from '../../../redux/selectors';
import { InnerContent } from '../inner-content/inner-content';
import { scrollToTop } from '../scroll';
import { Spinner } from '../spinner/spinner';
import './test-api.scss';

export const TestApi: React.FunctionComponent = () => {

    const loading: boolean = useSelector(getLoader);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchData());
            dispatch(hideLoader());
        }, 1000);
    }, [dispatch]);

    return (
        <>
            {  loading ?
                <Spinner />
                :
                <div className='wrapper-items' >
                    <InnerContent />
                    <div className="wrapper-items__wrapper-button">
                        <button
                            type="button"
                            onClick={ scrollToTop }
                            className="wrapper-items__scroll-button"
                        >
                            <i className="fa fa-chevron-up" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            }
        </>
    );
}; 