import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerSpec from '@/lib/swagger';

export default function SwaggerPage() {

    console.log("swaggerSpec", swaggerSpec);

    return <SwaggerUI spec={swaggerSpec} />;
}
