import { message } from 'antd';
import { LOADING, STOP_LOADING } from '../types/global';

export function handleAction(dispatch, func) {
    return new Promise((resolve, reject) => {
        dispatch({
            type: LOADING,
        });
        return func
            .then((res) => {
                dispatch({
                    type: STOP_LOADING,
                });
                // console.log(res);
                if (res.status === 200) {
                    return resolve(res.data);
                } else {
                    // console.log(res);
                    message.error(res.message ? res.message : JSON.stringify(res), 3);
                    return reject();
                }
            });
    });
}


