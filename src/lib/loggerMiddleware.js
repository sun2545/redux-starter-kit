const loggerMiddleware = store => next =>action =>{
    console.log('current status', store.getState());
    console.log('action', action);
    const result=next(action);

    console.log('next status', store.getState());
    console.log('\n');

    return result;
}

export default loggerMiddleware; 