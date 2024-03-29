import React, { useEffect, useRef, useState } from "react";

// const content = "<div>One</div><div>Two</div><div><br/></div>";

interface DynamicTextProps {
  primaryElement?: string;
  secondaryElement?: string;
  className?: string;
  isEditable?: boolean;
  content?: string | TrustedHTML;
  placeholder?: string;
  id?: string;
  onChange: (html: string) => void;
  preventChars?: string;
}

const moveCursorEndOfNode = (node: Node) => {
  const range = document.createRange();
  range.setStart(node, 1);
  range.setEnd(node, 1);
  const selection = window.getSelection();
  if (!selection) return;
  // Get the current selection and remove any existing ranges
  selection.removeAllRanges();
  // Add the new range to the selection
  selection.addRange(range);
};

const DynamicText: React.FC<DynamicTextProps> = ({ primaryElement = "p", secondaryElement = "span", className, isEditable = true, onChange, content = "", id, placeholder, preventChars }) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [isPlaceholder, setIsPlaceholder] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Asserting nativeEvent as InputEvent to access .data property
    const inputChar = (event.nativeEvent as InputEvent).data;

    // if (!placeholder)
    handleEmptyDiv();
    formatSpan();

    // useEffect(() => {
    //   console.log("IDK WHEN IT CHANGED")
    // }, [isPlaceholder]);

    if (inputChar) {
      handlePlaceholder(inputChar);
    } else {
      handlePlaceholder("");
    }

    const innerHTML = contentEditableRef.current?.innerHTML;
    if (innerHTML) {
      onChange(innerHTML);
    }
  };

  const handlePlaceholder = (inputChar: string) => {
    const contentEditableDiv = contentEditableRef.current;
    //
    // Placeholder Logic
    //
    if (contentEditableDiv?.textContent === "" && placeholder && !isPlaceholder) {
      setIsPlaceholder(true);
      const newNode = document.createElement(primaryElement);
      newNode.textContent = placeholder;
      newNode.className = "dynamic-placeholder";
      newNode.style.color = "#595959";
      newNode.style.opacity = ".7";

      contentEditableDiv.removeChild(contentEditableDiv.childNodes[0]);
      contentEditableDiv.appendChild(newNode);
      moveCursorEndOfNode(newNode);
    }
    if (isPlaceholder) {
      setIsPlaceholder(false);
      const newNode = document.createElement(primaryElement);
      newNode.textContent = inputChar;
      if (contentEditableDiv && contentEditableDiv.childNodes.length === 1) {
        contentEditableDiv.removeChild(contentEditableDiv.childNodes[0]);
        contentEditableDiv.appendChild(newNode);
        moveCursorEndOfNode(newNode);
      }
    }
  };

  useEffect(() => {
    formatElements();
    handleEmptyDiv();
    handlePlaceholder("");
  }, []);

  useEffect(() => {
    contentEditableRef.current?.focus();
  }, [isEditable]);

  const handleEmptyDiv = () => {
    const parentNode = contentEditableRef.current;
    const childNodes = parentNode?.childNodes;
    if (parentNode?.textContent === "" && childNodes?.length === 0) {
      const newNode = document.createElement(primaryElement);
      newNode.appendChild(document.createElement("br"));
      parentNode.appendChild(newNode);
    }
  };

  // Dont let elements nest on enter, take care of empty new lines seperate first element and the rest
  const formatElements = () => {
    if (!contentEditableRef.current) return;
    const parentNode = contentEditableRef.current;

    contentEditableRef.current.childNodes.forEach((node, i) => {
      // Makes first element different than the rest
      if (i === 0) {
        const newNode = document.createElement(primaryElement);

        //Add Id to the first / primary element
        if (id) newNode.id = id;

        // newNode.style.fontSize = "25px";
        newNode.textContent = node.textContent;

        parentNode?.insertBefore(newNode, node);
        parentNode?.removeChild(node);
      }
      // If an element isnt empty then we are creating an element of "secondaryElement" add the text of the node
      // And replace the muttled element with new one
      else if (node.textContent !== "") {
        const newNode = document.createElement(secondaryElement);
        if (secondaryElement === "span") {
          newNode.style.display = "block";
        }
        if (i === 1) newNode.className = "first-el";
        newNode.textContent = node.textContent;
        parentNode?.replaceChild(newNode, node);
      }
      // If element is empty add the empty add secondary El with <br/>
      else if (node.textContent === "") {
        const newNode = document.createElement(secondaryElement);
        newNode.appendChild(document.createElement("br"));
        if (i === 1) newNode.className = "first-el";
        if (secondaryElement === "span") {
          newNode.style.display = "block";
        }
        parentNode?.replaceChild(newNode, node);
      }
    });
  };

  const formatSpan = () => {
    if (!contentEditableRef.current) return;
    const range = document.createRange();
    // const parentNode = contentEditableRef.current;
    const childNodes = contentEditableRef.current.childNodes.forEach((node, i) => {
      node.childNodes.forEach((childChildNode) => {
        const nodeName = childChildNode.nodeName;
        // console.log(nodeName);
        if (nodeName === "SPAN") {
          // console.log({ parentNode: node, spanNode: childChildNode, firstChild: node.firstChild, firstLength: node.firstChild?.textContent?.length });
          const length = node.firstChild?.textContent?.length;
          (node.textContent = node.textContent), childChildNode.textContent;
          if (node.firstChild && length) {
            range.setStart(node.firstChild, length);
            range.setEnd(node.firstChild, length);
            const selection = window.getSelection();
            if (!selection) return;
            // Get the current selection and remove any existing ranges
            selection.removeAllRanges();
            // Add the new range to the selection
            selection.addRange(range);
          }
        }
      });
    });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      formatElements();
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      formatSpan();
      handleEmptyDiv();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && secondaryElement === "none") {
      e.preventDefault();
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      if (isPlaceholder) {
        e.preventDefault();
      }
    }
    if (preventChars && preventChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div
      aria-label="Text Area"
      className={className}
      ref={contentEditableRef}
      contentEditable={isEditable}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default DynamicText;
