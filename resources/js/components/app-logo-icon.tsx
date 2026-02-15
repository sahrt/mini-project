import type { SVGAttributes } from 'react';
import { Building2 } from 'lucide-react';
export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <Building2
            {...props}
            className="h-10 w-10 text-green-600 dark:text-green-400"
            strokeWidth={1.5}
        />
    );
}
