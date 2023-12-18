interface ITagInsertEditor {
  tagName: string;
  value?: { name: string; link: string };
}

export default function insertToEditor({ tagName, value }: ITagInsertEditor) {
  switch (tagName) {
    case "h1":
      return "\n# ";
    case "h2":
      return "\n## ";
    case "h3":
      return "\n### ";
    case "h4":
      return "\n#### ";
    case "h5":
      return "\n##### ";
    case "h6":
      return "\n###### ";
    case "p":
      return "";
    case "bold":
      return "**text**";
    case "italic":
      return "*text*";
    case "blockqoute":
      return "\n> ";
    case "orderlist":
      return "1. ";
    case "unorderlist":
      return "- ";
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
