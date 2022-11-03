declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module 'socket.io-client' {
  const content: any
  export = content
}
declare module 'docx'
declare module 'file-saver'
// declare module 'react-highlight-words'

// api接口域名
declare const API_HOST: string;