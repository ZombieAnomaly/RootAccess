# React

The front-end side of RootAccess is built in ReactJS, which is based on component architecture and uni-directional data flow. In short, the DOM is never manipulated directly but instead a you modify a Virtual DOM through state changes.

React uses JSX for their templating engine which is like html built into javascript as opposed to javascript functionality built into html. This subtle difference allows us to to encapsule component logic *within* the actually componenet instead of in this infamous *controller* mess everyone likes to talk about. This means our components can be made highly modular and *reusable*!

Most, if not all react apps have a state that is used to determine how to render the DOM at any given moment. When this state is changed React compares the difference and updates the DOM for us, re-rendering corresponding components to our desired outcome.

How does the state change effect our DOM you ask? Well, components are rendered with props (properties) that help define it's logic and how it should render. Since the logic is built *with* the component it becomes very easy to build reactive UI and pass data through down through props to modify the component. 

----
**HelloMessage.js**

    class HelloMessage extends React.Component {
      render() {
        return ( <div> Hello {this.props.name} </div> );
      }
    }

**App.js**

    <HelloMessage name="Tim" />,
    
----
