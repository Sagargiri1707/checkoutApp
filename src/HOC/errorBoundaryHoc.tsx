import { Component } from 'react';
import React from 'react';

interface IOwnState{
	hasError: boolean;
	error: string;
	errorInfo: string
}
interface IOwnProps{
	children: any;
	componentName: any;
}

class ErrorBoundary extends Component<IOwnProps,IOwnState> {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error:"",
			errorInfo:""
		};
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
			hasError: true
		});

	}

	render() {
		if (!this.props.children) return null; 
		if (!this.state.hasError) return this.props.children;
		console.error(this.state.errorInfo)
		return null
		
	}
}

export function withErrorBoundary (name:string, WrappedComponent:any) {
	const componentName = name || WrappedComponent.name || WrappedComponent.displayName || 'Component';

	class ComponentWithErrorBoundary extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<ErrorBoundary componentName={componentName}>
					<WrappedComponent {...this.props} />
				</ErrorBoundary>
			);
		}
	}

	return  React.forwardRef((props, ref) => {
		if (!ref) {
			return <ComponentWithErrorBoundary {...props} />;
		}
		return <ComponentWithErrorBoundary {...props} />;
	});;
}

export default ErrorBoundary;