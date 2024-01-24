import { readFile as fsReadFile, writeFile as fsWriteFile, mkdir, readdir, stat } from 'fs/promises';
import { join, parse } from 'path';

/**
 * Check if a directory exists.
 * @param {string} dir Directory to check
 * @returns `true` if dir exists, `false` otherwise
 */
export async function direxists(dir) {
  if (!dir) {
    return false;
  }

  try {
    const info = await stat(dir);
    return info.isDirectory();
  } catch (e) {
    return false;
  }
}

export async function createDirIfNotExists(dir) {
  if (!(await direxists(dir))) {
    await mkdir(dir);
  }
}

/**
 * Read only files from a directory and returns as an array.
 * @param {string} dir Directory to read files from
 * @returns {Promise<string[]>} Array of files in dir with full path, empty if
 *   error or no files
 */
export async function readFilesFromDir(dir) {
  let files = [];
  // console.log('dir', dir);
  try {
    files = await readdir(dir);
  } catch (e) {
    console.error('error', e);
    return [];
  }

  const mapped = files.map(async (file) => {
    const path = join(dir, file);
    // console.log('mapping', file, path);
    const info = await stat(path);
    // console.log('info', info);

    if (info.isDirectory()) {
      // console.log('is dir!');
      return null;
    }

    if (info.isFile()) {
      // console.log('is file!');
      return path;
    }

    return null;
  });

  // console.log('resolving promises...');
  const resolved = await Promise.all(mapped);
  // console.log('resolved!', resolved);

  // Remove any directories that will be represented by `null`
  const filtered = [];
  for (const file of resolved) {
    if (file) {
      filtered.push(file);
    }
  }
  // console.log('filtered', filtered);

  return filtered;
}

/**
 * Read a file and return its content.
 * @param {string} file File to read
 * @param {object} options.encoding asdf
 * @returns {Promise<string | null>} Content of file or `null` if unable to read.
 */
export async function readFile(file, { encoding = 'utf8' } = {}) {
  try {
    const content = await fsReadFile(file, { encoding });

    return content.toString(encoding);
  } catch (e) {
    return null;
  }
}


// planið les in skjöl rá string af json
// breyta í json senda í template
// senda template í write file
// TODO writfefile
// fs.writeFile(path.join('dist', 'index.html'), wfile);
// hann er búin að búa til dir vantar bara fileanna
const ip = './dist/index.html';
// const a = parse('/dist/index.html')
// console.log(await direxists(a.dir))


/**
 * @param {string} fileConentString
 * @param {string} filePathString  
 * @returns {Promise}
 */
export async function writeFile(filePathString, fileConentString) {
  const { dir } = parse(filePathString);
  if (await direxists(dir)) {
    await fsWriteFile(filePathString, fileConentString)
  } else {
    throw new Error(`directory:${dir} does not exist.`)
  }
}




