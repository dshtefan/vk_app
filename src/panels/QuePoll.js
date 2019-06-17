import React from 'react';
import {View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Question from './Question';

class QuePoll extends React.Component{
   constructor(props){
         super(props);
         this.state = {
            history: [],
            activePanel: "question0"
         }
   }

   goBack = () => {
      const hist = [...this.state.history];
      if(hist.length > 0){
         const last = hist.pop();
         var n = parseInt(last.match(/\d+/));
         if(n >= 0){
            this.setState({ history: hist });
            this.setState({ activePanel: 'question' + n });
         }
      } else{
         this.props.sv("home");
      }
   }

   goForward = (e) => {
      const queId = e.currentTarget.dataset.to;
      const hist = [...this.state.history];
      var n = parseInt(queId.match(/\d+/));
      if(Object.keys(this.props.data.items).length > n + 1){
         hist.push(queId);
         this.setState({ history: hist });
         n++;
         this.setState({ activePanel: 'question' + n });
      }
   }

   render(){
      return(
         <View id={this.props.id} activePanel={this.state.activePanel}>
            {Object.keys(this.props.data.items).map((i) => {
               return <Question id={"question" + i} data={this.props.data.items[i]} goF={this.goForward} goB={this.goBack}></Question>;
            })}
         </View>
      );
   }
}

export default QuePoll;
