import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';


class App extends Component {

    loadData=()=>{
        const {PostActions, number} = this.props;
        PostActions.getPost(number);
    }
    componentDidMount(){
        this.loadData();
        
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.number !== prevProps.number){
            this.loadData();
        }
    }
    render() {
        const { CounterActions, number, post, error, loading } = this.props;

        
        return (
            <div>
                <h1>{number}</h1>
                {
                    (()=> {
                        if(loading) return (<h2>loading...</h2>);
                        if(error) return (<h2>happen error! </h2>)
                        return(
                            <div>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            </div>

                        )
                    })()
                }
                   
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number:state.counter,
        post:state.post.data,
        loading: state.post.pending,
        error: state.post.error
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        postActions: bindActionCreators(postActions, dispatch)
    })
)(App);
