import { Route } from "react-router";
export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(routeProps) => {
          return(
            <div>
              <Component {...routeProps}></Component>
            </div>
          );
        }}
      ></Route>
    );
  };