import postcss from 'postcss';
import { camelCase } from 'lodash';

const FOLLOW_MSG = 'templatize-css: track';

export default function transformation(oldAst) {
  const tracks = getTracks(oldAst);
  const newAst = generateAst(oldAst, tracks);
  const info = { tracks, ast: newAst };
  return info;
}

function getTracks(ast) {
  let tracks = [];
  ast.walkComments(comment => {
    if (comment.text.startsWith(FOLLOW_MSG)) {
      tracks = [].concat(tracks).concat([{ startLine: comment.source.start.line }]);
    }
  });

  ast.walkRules(':root', rootRule => {
    rootRule.walkDecls(dec => {
      const followFound = tracks.find(follow => follow.startLine === dec.source.end.line);
      if (followFound) {
        tracks = tracks.map(follow => {
          if (followFound === follow) {
            return { name: dec.prop, defaultValue: dec.value, nameJs: camelCase(dec.prop) };
          }
          return follow;
        });
      }
    });
  });
  return tracks;
}

function generateAst(oldAst, tracks) {
  const newAst = postcss.root();
  oldAst.each(node => {
    appendNode(tracks, newAst, node);
  });
  return newAst;
}

function appendNode(tracks, father, node) {
  switch (node.type) {
    case 'rule': {
      if (node.selector === ':root') {
        return;
      }
      const rule = postcss.rule({ selector: node.selector });
      node.walkDecls(node2 => {
        const isTracked = !!tracks.find(f => node2.value.includes(f.name));
        if (isTracked) {
          rule.append(node2);
        }
      });
      if (rule.nodes && rule.nodes.length > 0) {
        father.append(rule);
      }
      break;
    }
    case 'atrule': {
      const atrule = postcss.atRule({ name: node.name, params: node.params });
      node.each(node2 => {
        appendNode(tracks, atrule, node2);
      });
      if (atrule.nodes && atrule.nodes.length > 0) {
        father.append(atrule);
      }
      break;
    }
    default:
      break;
  }
}
