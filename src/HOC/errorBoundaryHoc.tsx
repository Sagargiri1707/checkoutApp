import { Component, ErrorInfo } from 'react';
import React from 'react';

interface IOwnState{
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo |null;
}
interface IOwnProps{
	children: any;
	componentName: any;
}

class ErrorBoundary extends Component<IOwnProps,IOwnState> {
	constructor(props:IOwnProps) {
		super(props);
		this.state = {
			hasError: false,
			error:null,
			errorInfo:null
		};
	}

	componentDidCatch(error:Error, errorInfo:ErrorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
			hasError: true
		});

	}

	render() {
		if (!this.props.children) return null; 
		if (!this.state.hasError) return this.props.children;
		console.error(this.state.errorInfo,this.props.componentName)
		return null
		
	}
}

export function withErrorBoundary(
	name: string,
	WrappedComponent: React.ComponentType<any>
  ){
	const componentName = name || WrappedComponent?.name || WrappedComponent?.displayName || 'Component';

	class ComponentWithErrorBoundary extends React.Component {
		constructor(props:React.FC) {
			super(props);
		}

		render() {
			return (
				<ErrorBoundary componentName={componentName}>
					{WrappedComponent ?<WrappedComponent {...this.props} /> : null}
				</ErrorBoundary>
			);
		}
	}

	return (props:any) => {
		return <ComponentWithErrorBoundary {...props} />;
	};
}

export default ErrorBoundary;