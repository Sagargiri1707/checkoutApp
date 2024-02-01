import '@testing-library/jest-dom';
import {withErrorBoundary} from '../errorBoundaryHoc'
import { render, fireEvent, screen } from '@testing-library/react';

function Component(){
    return <div>Component</div>
}
const ComponentWithEb = withErrorBoundary('Component',Component)
function FaultyComponent(){
    return <div>Component {undefined[0]}</div>
}
const FaultyComponentWithEb = withErrorBoundary('FaultyComponent',FaultyComponent)

const EmptyChildComponent = withErrorBoundary("EmptyChildComponent",null)
describe('test error boundary with correct component',()=>{
    it('renders the working component successfully',()=>{
        const container = render(<ComponentWithEb/>)
        expect(container).toMatchSnapshot()
        expect(screen.getByText('Component')).toBeInTheDocument()
    })  
    it('doesnt renders the faulty component to screen',()=>{
        const container = render(<FaultyComponentWithEb/>)
        expect(container).toMatchSnapshot()
    })  
    it(' renders null with empty children passed',()=>{
        const container = render(<EmptyChildComponent/>)
        expect(container).toMatchSnapshot()
    })  

})
