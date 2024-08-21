import './Counter.scss';

interface CounterProps {
  nb: number;
}

function Counter({ nb }: CounterProps) {
  return <p className="counter">{nb} tâches en cours</p>;
}

export default Counter;
