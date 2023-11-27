import { borderRadius, color, fontSize, spacement } from "@namada/utils";
import styled from "styled-components";

export const SidebarPageGrid = styled.div`
  display: grid;
  grid-template-columns: ${spacement(55)} auto;
  gap: ${spacement(10)};
  padding: 0 ${spacement(5)};
  margin-top: ${spacement(10)};
`;

export const SidebarTitle = styled.h3`
  color: ${color("primary", "main")};
  border-top: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  padding: ${spacement(4)} 0;
  font-size: ${fontSize("base")};
`;

export const IconWrap = styled.i`
  display: inline-block;
  margin-left: ${spacement(1)};
  width: ${spacement(4)};
  vertical-align: middle;
  line-height: 0;
`;

export const TermsLinkWrapper = styled.a`
  align-items: center;
  color: currentColor;
  display: grid;
  gap: ${spacement(2)};
  grid-template-columns: max-content min-content;
  text-decoration: none;
  transition: 150ms ease-out color;

  &:hover {
    color: ${color("secondary", "main")};
  }
`;

export const TermsLinkWrapperWithIcon = styled(TermsLinkWrapper)`
  grid-template-columns: ${spacement(4)} max-content min-content;
`;

export const SocialList = styled.ul`
  margin: ${spacement(10)} 0 ${spacement(12)};
  padding: 0;
  list-style: none;
`;

export const SocialListItem = styled.li`
  color: ${color("primary", "main")};
  font-size: ${fontSize("base")};
  margin: ${spacement(5)} 0;
  padding: 0;
`;

export const MainContent = styled.article`
  max-width: 880px;
  border: 1px solid ${color("primary", "main40")};
  border-radius: ${borderRadius("lg")};
`;
