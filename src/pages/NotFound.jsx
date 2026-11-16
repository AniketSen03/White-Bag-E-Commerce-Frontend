import { Compass } from 'lucide-react';
import { Empty } from '../components/ui';

export default function NotFound() {
  return <Empty icon={Compass} title="This page does not exist" text="The link may be old or mistyped." action={{ to: '/', label: 'Go to home' }} />;
}
