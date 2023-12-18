interface ITagInsertEditor {
  tagName: string;
  value?: { name: string; link: string };
}

export default function insertToEditor({ tagName, value }: ITagInsertEditor) {
  switch (tagName) {
    case "h1":
      return "\n# text";
    case "h2":
      return "\n## text";
    case "h3":
      return "\n### text";
    case "h4":
      return "\n#### text";
    case "h5":
      return "\n##### text";
    case "h6":
      return "\n###### text";
    case "p":
      return "text";
    case "bold":
      return "**text**";
    case "italic":
      return "*text*";
    case "blockqoute":
      return "\n> text";
    case "orderlist":
      return "1. text";
    case "unorderlist":
      return "- text";
    case "code":
      return "`text`";
    case "blockCode":
      return "\n```lg\ntext\n```";
    case "img":
      return `\n![${value?.name}](${value?.link})\n`;
    case "link":
      return `[${value?.name}](${value?.link})`;
    default:
      return "  ";
  }
}
