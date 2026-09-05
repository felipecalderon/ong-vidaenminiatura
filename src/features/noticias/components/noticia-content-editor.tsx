"use client";

import "@mdxeditor/editor/style.css";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  ListsToggle,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  markdownShortcutPlugin,
  quotePlugin,
  Separator,
  tablePlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NoticiaContentEditorProps {
  name: string;
  initialMarkdown?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function NoticiaContentEditor({
  name,
  initialMarkdown = "",
  placeholder = "Escribe el contenido de la noticia...",
  error,
  className,
  onChange,
}: NoticiaContentEditorProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      <input type="hidden" name={name} value={markdown} readOnly />

      <div className="rounded-xl border border-outline-variant bg-card">
        <MDXEditor
          markdown={markdown}
          onChange={(value) => {
            if (isMounted.current) {
              setMarkdown(value);
              onChange?.(value);
            }
          }}
          placeholder={placeholder}
          contentEditableClassName="min-h-[320px] max-h-[600px] overflow-y-auto px-4 py-4 text-base leading-7"
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            tablePlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
              toolbarClassName:
                "border-b border-outline-variant bg-surface-container px-3 py-2 rounded-t-xl",
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BlockTypeSelect />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <ListsToggle />
                  <Separator />
                  <CreateLink />
                </>
              ),
            }),
          ]}
        />
      </div>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}
