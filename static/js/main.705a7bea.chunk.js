(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{20:function(e,t,a){e.exports=a(51)},25:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(3),s=a.n(r),o=(a(25),a(2)),l=a(4),c=a(5),u=a(9),m=a(6),h=a(8),d=a(19),v=a.n(d),p=a(7),b=a.n(p),g=(a(50),function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return""===this.props.title?"":i.a.createElement("div",{className:"App-body"},i.a.createElement("div",{className:"Movie-title"},this.props.title," "),i.a.createElement("div",{className:"Movie-subtext"},"Release date: ",this.props.release," \xa0 \xa0 \xa0 \xa0 Budget: $",this.props.budget," \xa0 \xa0 \xa0 \xa0 Run-time: ",this.props.runtime," minutes "),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("div",{className:"Summary-header"},"Summary "),i.a.createElement("div",{className:"Summary"},this.props.summary," "))}}]),t}(i.a.Component)),y=function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e,a))).state={value:"",autocompleteData:[],title:"",summary:"",release:"",budget:"",runtime:""},n.onChange=n.onChange.bind(Object(o.a)(n)),n.onSelect=n.onSelect.bind(Object(o.a)(n)),n.getItemValue=n.getItemValue.bind(Object(o.a)(n)),n.renderItem=n.renderItem.bind(Object(o.a)(n)),n.retrieveMovieList=n.retrieveMovieList.bind(Object(o.a)(n)),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"retrieveMovieList",value:function(e){var t=this;b.a.get("https://moviesearchzar.herokuapp.com/getMovies?movieName=".concat(e)).then((function(e){t.setState({autocompleteData:e.data.titles})}))}},{key:"onChange",value:function(e){this.setState({value:e.target.value}),this.retrieveMovieList(e.target.value)}},{key:"onSelect",value:function(e){var t=this;b.a.get("https://moviesearchzar.herokuapp.com/getMovie?movieId=".concat(e)).then((function(e){t.setState({value:"",autocompleteData:[],title:e.data.title,release:e.data.release,budget:e.data.budget,runtime:e.data.runtime,summary:e.data.summary})}))}},{key:"renderItem",value:function(e,t){return i.a.createElement("div",{key:e.id,style:{background:t?"lightgray":"white"}},e.label)}},{key:"getItemValue",value:function(e){return"".concat(e.id)}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"App-header"},i.a.createElement("h1",null," Movie Search Tool ")),i.a.createElement("div",{className:"Autocomplete"},i.a.createElement(v.a,{getItemValue:this.getItemValue,items:this.state.autocompleteData,renderItem:this.renderItem,value:this.state.value,onChange:this.onChange,onSelect:this.onSelect})),i.a.createElement("div",null,i.a.createElement(g,{title:this.state.title,release:this.state.release,budget:this.state.budget,runtime:this.state.runtime,summary:this.state.summary})))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[20,1,2]]]);
//# sourceMappingURL=main.705a7bea.chunk.js.map