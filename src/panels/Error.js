import React from 'react';
import {Div, View, Panel, PanelHeader} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class Error extends React.Component{
   render(){
      return(
         <View id={this.props.id} activePanel={this.props.id + "_panel"}>
            <Panel id={this.props.id + "_panel"}>
               <PanelHeader>
                  404
               </PanelHeader>
               <Div style={{ paddingTop: 30, paddingBottom: 60, color: 'gray', textAlign: 'center' }}>
                  <h2>404 Page Not Found</h2><br/>
                  <p>Упс… Мы не можем найти то, что Вы ищете</p>
               </Div>
            </Panel>
         </View>
      );
   }
}

export default Error;
