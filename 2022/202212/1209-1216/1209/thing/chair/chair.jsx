import useState from 'react';
import { useThing } from 'react-thing';

export default function Chair() {
   const [thing, setThing] = useState({ name: 'chair' });
   useThing(thing);

   const [sofa, setSofa] = useState({ name: 'sofa' });

   const down = () => {
      setSofa({ ...sofa, name: 'sofa' });
   }

   const up = () => {
      setSofa({ ...sofa, name: 'sofa' });
      setThing({ ...thing, name: 'chair' });   
   }
   
   return (
      <div>Chair</div>
   )
}
   
// Path: 1209/thing/sofa.jsx
