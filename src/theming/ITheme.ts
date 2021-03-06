export interface ITheme {
  name: string;
  color: {
    background: string;
    border: string;
    error: string;
    text: string;
    subText: string;
    spinner: string;
  };
  fontFamily: string;
  fontSize: {
    title: string;
    label: string;
    text: string;
  };
  fontWeight: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  padding: {
    inner: string;
  };
  margin: {
    inner: string;
  };

  button: {
    borderRadius: string;
    background: string;
  };
}
